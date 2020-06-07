import React from "react";
import {myStatementData} from '../../my-statement-data';
import {useState} from 'react';

export function Content() {
    const [showDate, setShowDate] = useState(true);
    const [showTime, setShowTime] = useState(true);
    const [showType, setShowType] = useState(true);
    const [showIncome, setShowIncome] = useState(true);
    const [showOutcome, setShowOutcome] = useState(true);
    const [group, setGroup] = useState(false);

    const onChangeDate = e => {
        if (!(showTime || showType || showIncome || showOutcome)) setShowDate(true);
        else
            setShowDate(e.target.checked);
    }
    const onChangeTime = e => {
        if (!(showType || showDate || showIncome || showOutcome)) setShowTime(true);
        else
            setShowTime(e.target.checked);
    }
    const onChangeType = e => {
        if (!(showTime || showDate || showIncome || showOutcome)) setShowType(true);
        else
            setShowType(e.target.checked);
    }
    const onChangeIncome = e => {
        if (!(showTime || showDate || showType || showOutcome)) setShowIncome(true);
        else
            setShowIncome(e.target.checked);
    }
    const onChangeOutcome = e => {
        if (!(showTime || showDate || showType || showIncome)) setShowOutcome(true);
        else
            setShowOutcome(e.target.checked);
    }

    const onChangeGroup = e => {
        setGroup(e.target.value === 'true');
    }
    //для локали
    const formatMonth = (month) => month < 10 ? '0' + month : month;
    const formatter = new Intl.NumberFormat(undefined, {style: "currency", currency: "RUB"});
    //сортируем по дате (возрастание)
    myStatementData.sort((a, b) => a.date.localeCompare(b.date));

    //группируем по году и считаем сумму поступлений/расходов
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
    //формируем нормальную таблицу и отсортированную
    let normalTable = myStatementData.map(el => {
        const tableDate = new Date(el.date).getDate() + '.' + formatMonth(new Date(el.date).getMonth() + 1) + '.' + new Date(el.date).getFullYear();
        const tableTime = new Date(el.date).getHours() + ':' + new Date(el.date).getMinutes() + ':' + new Date(el.date).getSeconds();
        return (
            <tr key={el._id}>
                {showDate && <td> {tableDate.toLocaleString()} </td>}
                {showTime && group === false ? <td> {tableTime.toLocaleString()} </td> : ''}
                {showType && group === false ? <td> {el.type} </td> : ''}
                {showIncome &&
                <td className="Income"> {el.amount > 0 ? formatter.format(el.amount) : ''} </td>}
                {showOutcome
                &&
                <td className="Outcome"> {el.amount < 0 ? formatter.format((-el.amount)) : ''}</td>}
            </tr>
        )
    })
    let groupedTable = groupedData.map(el => {
        return (
            <tr key={el.year}>
                {<td>{el.year}</td>}
                {<td className="Income"> {formatter.format(el.Income)} </td>}
                {<td className="Outcome"> {formatter.format(el.Outcome)}</td>}
            </tr>)
    })

    return (
        <div className="App-content">
            <div className="Config-block">
                <div><input type="checkbox" onChange={onChangeDate} id="checkboxData" checked={showDate}/>
                    <label htmlFor="checkboxData">Дата</label></div>
                <div><input type="checkbox" onChange={onChangeTime} id="checkboxTime" checked={showTime}/>
                    <label htmlFor="checkboxTime">Время</label></div>
                <div><input type="checkbox" onChange={onChangeType} id="checkboxType" checked={showType}/>
                    <label htmlFor="checkboxType">Тип</label></div>
                <div><input type="checkbox" onChange={onChangeIncome} id="checkboxIncome" checked={showIncome}/>
                    <label htmlFor="checkboxIncome">Приход</label></div>
                <div><input type="checkbox" onChange={onChangeOutcome} id="checkboxOutcome" checked={showOutcome}/>
                    <label htmlFor="checkboxOutcome">Расход</label></div>
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
                        {group === true ? <td>Дата</td> : showDate && <td>Дата</td>}
                        {showTime && group === false ? <td>Время</td> : ''}
                        {showType && group === false ? <td>Тип</td> : ''}
                        {group === true ? <td className={"Income"}>Приход</td> : showIncome && <td className={"Income"}>Приход</td>}
                        {group === true ? <td className={"Outcome"}>Расход</td> : showOutcome && <td className={"Outcome"}>Расход</td>}
                    </tr>
                    </thead>
                    <tbody>
                    {group === false ? normalTable : groupedTable}
                    </tbody>
                </table>
            </div>
        </div>
    );
}