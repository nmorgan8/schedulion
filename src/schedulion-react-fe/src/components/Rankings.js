import React, { useState, useEffect } from 'react';
import loader from './images/loader.gif'
import Table from './Table'

export default function Ranking({predictedRankings, rankingsLoading}) {
    console.log(rankingsLoading);
    return (
        // <div>

        // </div>
        rankingsLoading ? <img src={loader} alt="loading..." /> : <Table heading={predictedRankings.columns} body={predictedRankings.data} />
    )
}

