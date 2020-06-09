import React from "react";
import {myStatementData} from '../../my-statement-data';

export function Table({showDate , showTime, showType, showIncome, showOutcome}) {

    const formatMonth = (month) => month < 10 ? '0' + month : month;
    const formatTime = (time) => time < 10 ? time === 0 ? '00' : '0' + time : time;
    const formatAmount = new Intl.NumberFormat(undefined, {style: "currency", currency: "RUB"});

    const tableStringValidate = (el) => {
        if (!(showDate || showTime || showType || showIncome) && el.amount>0)
            return(false);
        else if (!(showDate || showTime || showType || showOutcome) && el.amount<0)
            return(false);
        else return (true);
    }
    myStatementData.sort((a, b) => a.date.localeCompare(b.date));

    return(
        <table>
            <thead>
            <tr>
                {showDate && <td>Дата</td>}
                {showTime && <td>Время</td>}
                {showType && <td>Тип</td>}
                {showIncome && <td className={"Income"}>Приход</td>}
                {showOutcome && <td className={"Outcome"}>Расход</td>}
            </tr>
            </thead>
            <tbody>
            {myStatementData.map(el => {
                const tableDate = new Date(el.date).getDate() + '.' + formatMonth(new Date(el.date).getMonth() + 1) + '.' + new Date(el.date).getFullYear();
                const tableTime = formatTime(new Date(el.date).getHours()) + ':' + formatTime(new Date(el.date).getMinutes()) + ':' + formatTime(new Date(el.date).getSeconds());

                if(tableStringValidate(el))
                return (
                    <tr key={el._id}>
                        {showDate && <td>{tableDate.toLocaleString()}</td>}
                        {showTime && <td>{tableTime.toLocaleString()}</td>}
                        {showType && <td>{el.type}</td>}
                        {showIncome && <td className="Income">{ el.amount > 0 ? formatAmount.format(el.amount) : ''}</td>}
                        {showOutcome && <td className="Outcome">{el.amount < 0 ? formatAmount.format((-el.amount)) : ''}</td>}
                    </tr>
                )
                return '';
            })}
            </tbody>
        </table>
    )
}