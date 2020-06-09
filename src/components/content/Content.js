import React from "react";
import {useState} from 'react';
import {Checkbox} from './Checkbox';
import {Table} from './Table';
import {TableGroup} from './TableGroup';

const initState = {
    showDate: true,
    showTime: true,
    showType: true,
    showIncome: true,
    showOutcome: true,
}

export function Content() {
    const [group, setGroup] = useState(0);
    const onChangeSelect = (e) => {setGroup(e.target.selectedIndex);}
    const [{
        showDate,
        showTime,
        showType,
        showIncome,
        showOutcome
    }, setCheckboxState] = useState(initState);

    const onChange = e => {
        const attr = e.target.getAttribute('id');
        const checked = e.target.checked;
        setCheckboxState(prevState => {
            const countChecked = Object.values(prevState).reduce((acc, el) => el ? acc + 1 : acc, 0);
            if (countChecked === 1 && !checked) return prevState;
            return {...prevState, [attr]: checked}
        });
    }
    return (
        <div className="App-content">
            <div className="Config-block">
                <Checkbox
                    onChange={onChange}
                    id={'showDate'}
                    checked={showDate}
                    labelText={"Дата"}
                />
                <Checkbox
                    onChange={onChange}
                    id={'showTime'}
                    checked={showTime}
                    labelText={"Время"}
                />
                <Checkbox
                    onChange={onChange}
                    id={'showType'}
                    checked={showType}
                    labelText={"Тип"}
                />
                <Checkbox
                    onChange={onChange}
                    id={'showIncome'}
                    checked={showIncome}
                    labelText={"Приход"}
                />
                <Checkbox
                    onChange={onChange}
                    id={'showOutcome'}
                    checked={showOutcome}
                    labelText={"Расход"}
                />
            </div>
            <div className="Grouping-block">
                <label>Группировка</label>
                <select onChange={onChangeSelect}>
                    <option>Без группировки</option>
                    <option>По дате</option>
                </select>
            </div>
            <div className="Content-Data">
                {
                    group === 1 ?
                        <TableGroup/>
                        :
                        <Table
                            showDate={showDate}
                            showTime={showTime}
                            showType={showType}
                            showIncome={showIncome}
                            showOutcome={showOutcome}
                        />
                }
            </div>
        </div>
    );
}