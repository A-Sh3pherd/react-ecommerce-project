import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import styled from 'styled-components';
import axios from "axios";


const Bordered = styled.div`
  border: 1px solid #dbdbdb;
  box-shadow: 0 0 50px -15px grey;
  padding: 50px;
`

const StoreStats = () => {
    const [storeStats, setStoreStats] = useState({orders: 0, products: 0})

    // Get Store Data
    async function getStoreData() {
        const {data} = await axios.get('http://localhost:3005/stats');
        console.log(data)
        setStoreStats(data)
    }

    useEffect(() => {
        getStoreData().catch(e => console.log(e))
    }, [])
    return (
        <>
            <Col>
                    <Bordered>
                        <h3>Amount of orders this week: <strong>{storeStats.orders}</strong></h3>
                        <h3>Amount of Available Products: <strong>{storeStats.products}</strong></h3>
                    </Bordered>
            </Col>
        </>
    );
};

export default StoreStats;
