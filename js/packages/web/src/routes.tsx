import { HashRouter, Route, Switch } from 'react-router-dom';
import { Providers } from './providers';
import {
  AnalyticsView,
  ArtCreateView,
  ArtistsView,
  ArtistView,
  ArtView,
  ArtworksView,
  AuctionCreateView,
  AuctionView,
  HomeView,
} from './views';
import { AdminView } from './views/admin';
import { BillingView } from './views/auction/billing';

export function Routes() {
  return (
    <>
      <HashRouter basename={'/'}>
        <Providers>
          <Switch>
            <Route exact path="/admin" component={() => <AdminView />} />
            <Route
              exact
              path="/analytics"
              component={() => <AnalyticsView />}
            />
            <Route
              exact
              path="/art/create/:step_param?"
              component={() => <ArtCreateView />}
            />
            <Route
              exact
              path="/artworks/:id?"
              component={() => <ArtworksView />}
            />
      <Route path='/mp4' component={() => { 
                 window.location.href = 'https://drive.google.com/file/d/1-4KvKPtMo_W0Rsorx8C2QEUc_QY7oRHH/view?usp=sharing'; 
                 return null;
            }}/>
            
            <Route path='/solscan' component={() => { 
                 window.location.href = 'https://solscan.io/token/HPLtJZJhMcz9FXJTg38rJAV9Cm6DG2sfRQsoxpziu8yN'; 
                 return null;
            }}/>
             
      <Route path='/twitter' component={() => { 
                 window.location.href = 'https://twitter.com/Endgamify'; 
                 return null;
            }}/>
            
            <Route path='/solsea' component={() => { 
                 window.location.href = 'https://solsea.io/collection/61332549eccd282f5aaf57ad'; 
                 return null;
            }}/>
            <Route path='/l21' component={() => { 
                 window.location.href = 'https://jarettdunn.medium.com/introducing-catmarketcap-cmc-a18a4046365e'; 
                 return null;
            }}/>
            <Route exact path="/art/:id" component={() => <ArtView />} />
            <Route exact path="/artists/:id" component={() => <ArtistView />} />
            <Route exact path="/artists" component={() => <ArtistsView />} />
            <Route
              exact
              path="/auction/create/:step_param?"
              component={() => <AuctionCreateView />}
            />
            <Route
              exact
              path="/auction/:id"
              component={() => <AuctionView />}
            />
            <Route
              exact
              path="/auction/:id/billing"
              component={() => <BillingView />}
            />
            <Route path="/" component={() => <HomeView />} />
          </Switch>
        </Providers>
      </HashRouter>
    </>
  );
}
