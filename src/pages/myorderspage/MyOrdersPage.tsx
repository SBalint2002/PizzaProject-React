import React, {useEffect, useState} from "react";
import "./MyOrders.css";
import Container from "react-bootstrap/Container";
import {authFetch} from "../../Util";
import {OrderProduct} from "../../components/Contexts/ProductContextProvider";
import MyOrderCard from "../../components/myordercard/MyOrderCard";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import logo from "./logoszoveg.jpeg";

export interface MyOrdersProp {
    location: string;
    orderDate: Date;
    phoneNumber: string;
    price: number;
    ready: boolean;
    pizzas: OrderProduct[];

}

const MyOrdersPage = () => {
    const [myOrdersList, setMyOrdersList] = useState<MyOrdersProp[]>([]);
    const fetchData= async ()=>{
        try {
            const res = await authFetch("/order/get-orders",{
                method: "GET",
            });

            if (res.ok){
                const json = await res.json();
                const orders = json.map((order: any) => {
                    return {
                        location: order.location,
                        orderDate: new Date(order.order_date),
                        phoneNumber: order.phone_number,
                        price: order.price,
                        ready: order.ready,
                        pizzas: order.orderPizzas.map((pizza: any) => {
                            return {
                                id: pizza.id,
                                name: pizza.pizza.name,
                                description: pizza.pizza.description,
                                picture: pizza.pizza.picture,
                                price: pizza.pizza.price,
                                available: pizza.pizza.available
                            }
                        })
                    }
                });
                setMyOrdersList(orders.reverse());
            } else {
                console.log("Invalid token");
            }
        } catch (error) {
            console.log("Sikertelen lekérés");
            console.log(error);
        }
    }

    useEffect( ()  =>  {
        fetchData();
        setInterval(()=>{
            fetchData();
        },6000)
    }, []);

    if (myOrdersList.length===0){
        return (
            <Container className="emptyContainer">
                <h1>Még nem adtál le rendelést...</h1>
                <Link to="/menu" style={{textDecoration: "none"}}><Button>Rendelj most</Button></Link>

                <div>
                    <img style={{width:"300px"}} src={logo} alt="logo"/>
                </div>

            </Container>
        )
    }else{
        return (
            <div>
                <Container>
                    {myOrdersList.map((order, i) => (
                        <MyOrderCard key={i} order={order} />
                    ))}
                </Container>
            </div>
        )
    }

}

export default MyOrdersPage;