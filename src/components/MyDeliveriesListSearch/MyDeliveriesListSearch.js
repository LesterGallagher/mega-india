import React, { Component } from 'react';
import styles from './MyDeliveriesListSearch.module.css';
import { List, ListItem, ListTitle, Card, Button, Input, SearchInput } from 'react-onsenui';
import algoliasearch from 'algoliasearch/lite';

import {
    InstantSearch,
    HierarchicalMenu,
    RefinementList,
    SortBy,
    Stats,
    ClearRefinements,
    RatingMenu,
    RangeInput,
    Highlight,
    Panel,
    Configure,
    connectSearchBox,
    connectInfiniteHits,
    connectStateResults,
    Hits,
} from 'react-instantsearch-dom';
import UserBadge from '../UserBadge/UserBadge';
import RouteBadge from '../RouteBadge/RouteBadge';
import AuthStore from '../../stores/AuthStore';

const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_API_KEY
);
class MyDeliveriesListSearch extends Component {
    constructor(props) {
        super();
        this.state = {
        };

    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    handleClick = hit => {
        this.props.onSelect && this.props.onSelect({ uid: hit.objectID, publicUserData: hit.public || {} });
    }

    render() {
        return (
            <InstantSearch searchClient={searchClient} indexName={process.env.REACT_APP_ALGOLIA_DELIVERIES_INDEX_NAME}>
                <div className="right-panel">
                    <ConnectedSearchBox />
                    <ConnectedHits onClick={this.handleClick} hitComponent={Hit} />
                    <Configure
                        filters={`acceptedRouteOrderOffer.senderUid:${AuthStore.user.uid}`}
                        hitsPerPage={10} />
                </div>
            </InstantSearch>
        );
    }
}

export default MyDeliveriesListSearch;


const Hit = ({ hit, onClick }) => {
    const { objectID } = hit;
    return (
        <ListItem tappable onClick={onClick.bind(this, hit)} style={{ padding: 0 }}>
            <div className="center">
                <RouteBadge routeOrder={hit} />
            </div>
        </ListItem>
    );
}

const SearchBox = ({ currentRefinement, refine }) => (
    <div
        style={{
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            marginLeft: 0,
            flexGrow: 1,
        }}
    >
        <SearchInput
            style={{ width: 500 }}
            value={currentRefinement}
            onChange={e => refine(e.target.value)}
            placeholder="Zoek naar een eventuele ontvanger..."
        />
    </div>
);


function CustomHits({ hits, marginLeft, hasMore, refine, hitComponent, onClick }) {
    const C = hitComponent;
    return (
        <div>
            <List id="hits">
                {hits.length === 0 && <ListItem>Je hebt nog geen bezorgingen gedaan.</ListItem>}
                {hits.map(hit => (
                    <C onClick={onClick} key={hit.objectID} hit={hit} />
                ))}
            </List>
            {hits.length !== 0 && <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    modifier="large--cta"
                    onClick={() => hasMore && refine()}
                    disabled={!hasMore}
                >Meer</Button>
            </div>}
        </div>
    );
};

const ConnectedHits = connectInfiniteHits(CustomHits);
const ConnectedSearchBox = connectSearchBox(SearchBox);


