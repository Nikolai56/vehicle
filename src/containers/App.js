// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/Chart';
import Controls from '../components/Controls';
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

export type Props = {
    filteredIds: Array<number>,
    signals: Object,
    components: Array<Object>,
    dispatch: (args: any) => void,
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
        const { signals, isLoading, filteredIds } = this.props;

        if (isLoading) return <div>Loading</div>;

        return (
            <div className="App">
                <Controls
                    components={signals.components}
                />
                <Chart
                    filteredIds={filteredIds}
                    data={signals}
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
    filteredIds: state.filteredIds,
    isLoading: state.isLoading,
    signals: state.signals,
    error: state.error,
});

export default connect(mapStateToProps)(App);
