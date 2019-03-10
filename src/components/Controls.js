// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { updateFilters } from '../actions';
import { type Props } from '../containers/App';

class Controls extends PureComponent<Props> {

    handleFetchRates = id => {
        const { filteredIds } = this.props;

        if (~filteredIds.indexOf(id)) {
            this.props.dispatch(updateFilters(
                filteredIds.filter(filId => filId !== id)
            ));
        } else {
            this.props.dispatch(updateFilters(
                [...filteredIds, id]
            ));
        }

    };

    render() {
        const { components } = this.props;

        return (
            <div>
                {components.map(component => (
                    <button
                        key={component.subsystem_id}
                        onClick={() => this.handleFetchRates(component.subsystem_id)}
                    >
                        {component.title}
                    </button>
                ))}
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

export default connect(mapStateToProps)(Controls);
