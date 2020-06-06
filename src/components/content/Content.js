import React from "react";
import {myStatementData} from '../../my-statement-data';
import {useState} from 'react';


export function Content() {
    const [showDate, setShowDate] = useState(true);
    const [showTime, setShowTime] = useState(true);
    const [showType, setShowType] = useState(true);
    const [showIncome, setShowIncome] = useState(true);
    const [showSpending, setShowSpending] = useState(true);
    const [group, setGroup] = useState(false);

    const onChangeDate = e => {
        setShowDate(e.target.checked);
    }
    const onChangeTime = e => {
        setShowTime(e.target.checked);
    }
    const onChangeType = e => {
        setShowType(e.target.checked);
    }
    const onChangeIncome = e => {
        setShowIncome(e.target.checked);
    }
    const onChangeSpending = e => {
        setShowSpending(e.target.checked);
    }
    const onChangeGroup = e => {
        setGroup(e.target.value === 'true');
    }
    const formatMonth = (month) => month < 10 ? '0' + month : month;

    myStatementData.sort((a, b) => a.date.localeCompare(b.date));

    return (
        <div className="App-content">
            <div className="Config-block">
                <div><input type="checkbox" onChange={onChangeDate} title={'Дата'} defaultChecked="checked"/>
                    <label>Дата</label></div>
                <div><input type="checkbox" onChange={onChangeTime} title={'Время'} defaultChecked="checked"/>
                    <label>Время</label></div>
                <div><input type="checkbox" onChange={onChangeType} title={'Тип'} defaultChecked="checked"/>
                    <label>Тип</label></div>
                <div><input type="checkbox" onChange={onChangeIncome} title={'Приход'} defaultChecked="checked"/>
                    <label>Приход</label></div>
                <div><input type="checkbox" onChange={onChangeSpending} title={'Расход'} defaultChecked="checked"/>
                    <label>Расход</label></div>
            </div>
            <div className="Grouping-block">
                <label>Группировка</label>
                <select value={group} onChange={e => onChangeGroup(e)}>
                    <option value="false">Без группировки</option>
                    <option value="true">По дате</option>
                </select>
            </div>
            <div className="Content-Data">
                <table>
                    <thead>
                    <tr>
                        {group === true ? <td>Дата</td> : showDate &&<td>Дата</td>}
                        {showTime && group === false ? <td>Время</td> : ''}
                        {showType && group === false ? <td>Тип</td> : ''}
                        {group === true ? <td>Приход</td> : showIncome && <td>Приход</td>}
                        {group === true ? <td>Расход</td> : showSpending && <td>Расход</td>}
                    </tr>
                    </thead>
                    <tbody>
                    {/*
                    Время и дату
                    Последние столбцы тоже
                    toLocaleDateString()
                    для группировки - в первую после последней для даты строку добавить индекс <tr key={el._id+'new'}>
                    if(indexOf())
                    */}
                    {myStatementData.map(el => {
                        const tableDate = new Date(el.date).getDate() + '.' + formatMonth(new Date(el.date).getMonth() + 1) + '.' + new Date(el.date).getFullYear();
                        const tableTime = new Date(el.date).getHours() + ':' + new Date(el.date).getMinutes() + ':' + new Date(el.date).getSeconds();
                        return (
                            group === false ?
                                <tr key={el._id}>
                                    {showDate && <td> {tableDate.toLocaleString()} </td>}
                                    {showTime && group === false ? <td> {tableTime.toLocaleString()} </td> : ''}
                                    {showType && group === false ? <td> {el.type} </td> : ''}
                                    {showIncome && <td className="Income"> {el.amount > 0 ? el.amount.toLocaleString() : ''} </td>}
                                    {showSpending && <td className="Spending"> {el.amount < 0 ? (-el.amount).toLocaleString() : ''}</td>}
                                </tr>
                                // нужна сумма столбцов $ по дням!
                                :
                                <tr>
                                    {<td>{tableDate.toLocaleString()}</td>}
                                    {<td className="Income"> {el.amount > 0 ? el.amount.toLocaleString() : ''} </td>}
                                    {<td className="Spending"> {el.amount < 0 ? (-el.amount).toLocaleString() : ''}</td>}
                                </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}