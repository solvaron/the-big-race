import React, {Component} from 'react';
import Row from './Row/Row';
import axios from 'axios';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
import {Button} from 'primereact/components/button/Button';

import classes from './RunnerTable.css';


class RunnerTable extends Component {
    state = {
        runners: [],
        error: false,
        loadDataTbl: false
    }

    componentDidMount() {
        axios.get('/Runners')
             .then(response => {
                const runnerData = response.data.map(runner => {
                    let ageGroup = '';
                    if(runner.Age <= 15)
                        ageGroup = 1;
                    else if((runner.Age > 15) && (runner.Age <= 29))
                        ageGroup = 2;
                    else if(runner.Age >= 30)
                        ageGroup = 3;
                    return {
                        ...runner,
                        Id: runner.Name + '-' + runner.Time + '-' + runner.Age,
                        Rank: '',
                        AgeGroup: ageGroup
                    }
                });
                console.log('Value of runnerData:' , runnerData);
                this.setState({runners: runnerData});
                this.setState({error: false});
                
             }).catch(error => {
                 this.setState({error: true});
             });
    }

     setRank = () => {
        console.log('Entering setRank()');
        const runnersCopy = {
            ...this.state.runners
        };
        let runnersArray = [];
        runnersArray = Object.keys(runnersCopy)
                             .map(runKey => {
                                 return runnersCopy[runKey];
                             });
        console.log('runnersArray: ', runnersArray);

        let firstAgeGroupRank = 1;
        let secondAgeGroupRank = 1;
        let thirdAgeGroupRank = 1;

        runnersArray.sort((a, b)=> {return a.Time - b.Time});
        console.log('runnersArray after sort:', runnersArray);

        for(let runner of runnersArray) {
            console.log('Entering next For loop runner: ', runner);
            switch(runner.AgeGroup) {
                case 1:
                runner.Rank = firstAgeGroupRank;
                    firstAgeGroupRank += 1;
                    break;
                case 2:
                runner.Rank = secondAgeGroupRank;
                    secondAgeGroupRank += 1;
                    break;
                case 3:
                runner.Rank = thirdAgeGroupRank;
                    thirdAgeGroupRank += 1;
                    break;
                default:
                    console.log('Age Group Error: ', runner.AgeGroup);
                    console.log('Age of Runner: ', runner.Age);
            }
        }
        console.log('Value of run after FOR loop: ', runnersArray);
        this.setState({runners: runnersArray, loadDataTbl: true});
    }; 

    render() {

        const cols = [
            {field: 'Name', header: 'Name'},
            {field: 'Time', header: 'Time'},
            {field: 'Age', header: 'Age'},
            {field: 'Rank', header: 'Rank'}
        ];

        let dynamicColumns = cols.map((col,i) => {
            return <Column key={col.field} field={col.field} header={col.header} sortable={true} />;
        });

        let runners = <tr style={{textAlign: 'center'}}><td> Loading...</td></tr>;
        let runnersToo = '';

        if(!this.state.error) {
            
            runners = this.state.runners.map(runner => {
                return <Row
                    key={runner.Id}
                    name={runner.Name}
                    time={runner.Time}
                    age={runner.Age}
                    rank={runner.Rank} />;
            });

            runnersToo = this.state.runners;
        }

        return (
            <div className={classes.Runner}> 
            <table>
                <thead>
                    <tr>
                        <td><strong>Name</strong></td>
                        <td><strong>Time</strong></td>
                        <td><strong>Age</strong></td>
                        <td><strong>Rank</strong></td>
                    </tr>
                </thead>
                <tbody>
                    {runners}
                </tbody>
            </table>
            <Button onClick={this.setRank}>Set Runner Rank</Button> <br />
            <DataTable value={runnersToo}>
                {dynamicColumns}
            </DataTable>
            </div>
        );
    }
}

export default RunnerTable;