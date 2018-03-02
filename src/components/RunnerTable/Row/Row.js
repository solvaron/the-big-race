import React from 'react';

const row = (props) => (
    <tr>
        <td>{props.name}</td>
        <td>{props.time}</td>
        <td>{props.age}</td>
        <td>{props.rank}</td>
    </tr>
);

export default row;