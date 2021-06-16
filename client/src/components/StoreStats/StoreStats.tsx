import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import styled from 'styled-components';
import axios from "axios";
import Stats from '../../imgs/Store Stats.png';


const Bordered = styled.section`
  border: 1px solid #dbdbdb;
  box-shadow: 0 0 50px -15px grey;
  padding: 20px;
  width: 325px;
  margin-top: 5rem;
  overflow: auto;
  line-break: auto;
`

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`

const Td = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`

const Th = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;

`

const Image = styled.img`
  display: flex;
  justify-content: center;
  margin-left: 25px;
`
const StoreStats = () => {
    const [storeStats, setStoreStats] = useState({orders: 0, products: 0})

    // Get Store Data
    async function getStoreData() {
        const {data} = await axios.get('http://localhost:3005/stats');
        setStoreStats(data)
    }

    useEffect(() => {
        getStoreData().catch(e => console.log(e))
    }, [])
    return (
        <>
            <Bordered>
                <Image
                    src={Stats}
                    alt="Stats Logo"

                />
                <br/>
                <br/>
                <Table>
                    <thead>
                    <tr>
                        <Th>Orders</Th>
                        <Th>Products</Th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <Td><strong>{storeStats.orders}</strong></Td>
                        <Td><strong>{storeStats.products}</strong></Td>
                    </tr>
                    </tbody>
                </Table>

                {/*<h3>Amount of orders this week: <strong>{storeStats.orders}</strong></h3>*/}
                {/*<h3>Amount of Available Products: <strong>{storeStats.products}</strong></h3>*/}
            </Bordered>
        </>
    );
};

export default StoreStats;
