import React from "react";
import {myStatementData} from '../../my-statement-data';

export function TableGroup(Format) {
    const formatAmount = new Intl.NumberFormat(undefined, {style: "currency", currency: "RUB"});

    myStatementData.sort((a, b) => a.date.localeCompare(b.date));

    function groupByYear(myData) {
        function makeTr(year) {
            return {
                year: year,
                Income: 0,
                Outcome: 0
            };
        }

        let i = 0, temp = [makeTr(new Date(myData[0].date).getFullYear())];
        for (let item of myData) {
            if (temp[i].year === new Date(item.date).getFullYear()) {
                item.amount > 0 ? temp[i].Income += item.amount : temp[i].Outcome += -item.amount;
            } else {
                temp.push(makeTr(new Date(item.date).getFullYear()));
                i++;
                item.amount > 0 ? temp[i].Income += item.amount : temp[i].Outcome += -item.amount;
            }
        }
        return temp;
    }

    const groupedData = groupByYear(myStatementData);
    let groupedTable = groupedData.map(el => {
        return (

            <tr key={el.year}>
                {<td>{el.year}</td>}
                {<td className="Income"> {formatAmount.format(el.Income)} </td>}
                {<td className="Outcome"> {formatAmount.format(el.Outcome)}</td>}
            </tr>

        )
    })
    return (
        <table>
            <thead>
            <tr key={"theadTableGroup"}>
                {<td>Дата</td>}
                {<td className={"Income"}>Приход</td>}
                {<td className={"Outcome"}>Расход</td>}
            </tr>
            </thead>
            <tbody>
            {groupedTable}
            </tbody>
        </table>
    );
}