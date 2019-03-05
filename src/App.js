import React, { Component } from 'react';
import Chart from './components/Chart';
import './App.css';
import jsonData from './02-response';

// const baseData = JSON.parse(`${jsonData}`);
// console.log(JSON.parse(JSON.stringify(jsonData)));
// console.log(jsonData);
const baseData = jsonData.data;

const data = [
    {
        item: 12,
        count: 0
    },
    {
        item: 31,
        count: 1
    },
    {
        item: 24,
        count: 2
    },
];

class App extends Component {
    render() {
        return (
            <div className="App">
                <div>
                    <button>Te</button>
                </div>
                <Chart
                    data={data}
                    baseData={baseData}
                    height={500}
                    width={1280}
                    padding={30}
                />
            </div>
        );
    }
}

export default App;
