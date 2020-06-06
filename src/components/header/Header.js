import React from 'react';

export function Header() {
    return (
        <header className="App-header">
            <h1>Моя Выписка</h1>
            <div>
                <img src="/ava.png" width="40" alt="ico"/>
                <a href="/user/username">Иван Иванов</a>
            </div>
        </header>
    );
}