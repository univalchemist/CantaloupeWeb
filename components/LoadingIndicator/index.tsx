import {Operation} from '@apollo/client';
import {useContext} from 'react';

import {useApolloNetworkStatus} from '../../apollo-client';
import LoadingContext from '../../contexts/loadingContext';

import * as Styled from './styles';

export default function LoadingIndicator() {
  const {loading, setLoading} = useContext(LoadingContext);
  const status: any = useApolloNetworkStatus({
    shouldHandleOperation: (operation: Operation) =>
      // not = false, to allow only using context: {useApolloNetworkStatus: false} on qraphql queries and mutations to hide the loading indicator
      // leaving the context off the query or mutation will default to the loading indicator
      operation.getContext().useApolloNetworkStatus !== false,
  });

  return (
    <Styled.Wrapper>
      <Styled.Loader
        show={
          status.numPendingQueries > 0 ||
          status.numPendingMutations > 0 ||
          loading
        }>
        <svg
          className="comet-spinner__icon"
          aria-labelledby="title"
          viewBox="-25 -25 250 250">
          <title>Loading More...</title>
          <defs>
            <linearGradient
              id="spinner-color-1"
              gradientUnits="objectBoundingBox"
              x1="0"
              y1="0"
              x2="1"
              y2="1">
              <stop offset="0%" stopColor="#FF7F32" stopOpacity="0" />
              <stop offset="100%" stopColor="#FF7F32" stopOpacity=".2" />
            </linearGradient>
            <linearGradient
              id="spinner-color-2"
              gradientUnits="objectBoundingBox"
              x1="0"
              y1="0"
              x2="0"
              y2="1">
              <stop offset="0%" stopColor="#FF7F32" stopOpacity=".2" />
              <stop offset="100%" stopColor="#FF7F32" stopOpacity=".4" />
            </linearGradient>
            <linearGradient
              id="spinner-color-3"
              gradientUnits="objectBoundingBox"
              x1="1"
              y1="0"
              x2="0"
              y2="1">
              <stop offset="0%" stopColor="#FF7F32" stopOpacity=".4" />
              <stop offset="100%" stopColor="#FF7F32" stopOpacity=".6" />
            </linearGradient>
            <linearGradient
              id="spinner-color-4"
              gradientUnits="objectBoundingBox"
              x1="1"
              y1="1"
              x2="0"
              y2="0">
              <stop offset="0%" stopColor="#FF7F32" stopOpacity=".6" />
              <stop offset="100%" stopColor="#FF7F32" stopOpacity=".8" />
            </linearGradient>
            <linearGradient
              id="spinner-color-5"
              gradientUnits="objectBoundingBox"
              x1="0"
              y1="1"
              x2="0"
              y2="0">
              <stop offset="0%" stopColor="#FF7F32" stopOpacity=".8" />
              <stop offset="100%" stopColor="#FF7F32" stopOpacity="1" />
            </linearGradient>
            <linearGradient
              id="spinner-color-6"
              gradientUnits="objectBoundingBox"
              x1="0"
              y1="1"
              x2="1"
              y2="0">
              <stop offset="0%" stopColor="#FF7F32" stopOpacity="1" />
              <stop offset="100%" stopColor="#FF7F32" stopOpacity="1" />
            </linearGradient>
          </defs>
          <g fill="none" strokeWidth="50" transform="translate(100,100)">
            <path
              d="M 0,-100 A 100,100 0 0,1 86.6,-50"
              stroke="url(#spinner-color-1)"
            />
            <path
              d="M 86.6,-50 A 100,100 0 0,1 86.6,50"
              stroke="url(#spinner-color-2)"
            />
            <path
              d="M 86.6,50 A 100,100 0 0,1 0,100"
              stroke="url(#spinner-color-3)"
            />
            <path
              d="M 0,100 A 100,100 0 0,1 -86.6,50"
              stroke="url(#spinner-color-4)"
            />
            <path
              d="M -86.6,50 A 100,100 0 0,1 -86.6,-50"
              stroke="url(#spinner-color-5)"
            />
            <path
              d="M -86.6,-50 A 100,100 0 0,1 0,-100"
              stroke="url(#spinner-color-6)"
            />
          </g>
        </svg>
      </Styled.Loader>
    </Styled.Wrapper>
  );

  return null;
}
