// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/Chart';
import { fetchSignals } from '../actions';
import '../styles/App.css';

const barsData = [
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

type Props = {
    data: Object,
    dispatch: (action: () => any) => void,
    isLoading: boolean,
    error: 'string',
};

class App extends PureComponent<Props> {

    componentDidMount() {
        this.handleFetchRates();
    }

    handleFetchRates = () => {
        this.props.dispatch(fetchSignals());
    };

    render() {
        const { data, isLoading } = this.props;

        if (isLoading) return <div>Loading</div>;

        return (
            <div className="App">
                <div>
                    <button>Steering & Brakes</button>
                </div>
                <Chart
                    data={data}
                    // baseData={data}
                    height={500}
                    width={1280}
                    padding={30}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.isLoading,
    data: state.data,
    error: state.error,
});

export default connect(mapStateToProps)(App);
