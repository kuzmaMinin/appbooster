import React from 'react';
import gql from 'graphql-tag';
import {Container, Box, SnackbarContent} from '@material-ui/core';
import {useLazyQuery} from 'react-apollo';
import Loader from "./Loader";
import SearchIssue from "./SearchIssue";
import CollapsibleTable from './IssuesCollapseTable'

export const ISSUES_QUERY = gql`
    query Issues($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
    createdAt
    id
    issues(last: 5) {
      totalCount
      edges {
        node {
          id
          bodyText
          title
          number
          comments(last: 10) {
            totalCount
            edges {
              node {
                id
                bodyText
                author {
                  login
                }
              }
            }
          }
        }
      }
    }
    name
    owner {
      login
     }
  }
}
`;

const Issues: React.FC = () => {
    const [loadQuery, {called, data: loadData, loading}] = useLazyQuery(ISSUES_QUERY);

    return (
        <Container>
            <SearchIssue loadQuery={loadQuery}/>
            {
                (called && loading) ? <Loader/> :
                    <Box mt={5}>
                        {
                            loadData ? <CollapsibleTable data={loadData}/> : called &&
                                <SnackbarContent message="По вашему запросу ничего не найдено"/>
                        }
                    </Box>
            }
        </Container>
    );
}

export default Issues;
