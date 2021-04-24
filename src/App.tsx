import './App.css';
import Header from "./components/Header";
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

const token = 'ваш токен github api';

const httpLink = {
    uri: 'https://api.github.com/graphql',
    headers: {
        authorization: `Bearer ${token}`
    }
};

const client = new ApolloClient({
    link: new HttpLink(httpLink),
    cache: new InMemoryCache()
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Header/>
        </ApolloProvider>
    );
}

export default App;
