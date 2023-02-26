import React, {Component, ErrorInfo, PropsWithChildren} from 'react';


type ErrorBoundaryState = {
    error: Error | null;
    errorInfo: ErrorInfo | null;
};


export default class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
    constructor(props: PropsWithChildren) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });
    }

    render() {
        if (this.state.error && this.state.errorInfo) {
            return (
                <div>
                    <p>Something went wrong.</p>
                    <details className='whitespace-pre-wrap'>
                        <p>{this.state.error.toString()}</p>
                        <p>{this.state.errorInfo.componentStack}</p>
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
}
