import { useLocation, useNavigate, useParams } from 'react-router-dom';

function withRouter(Component: any) {
    function ComponentWithRouterProp(props: any) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Component {...props} router={{ location, navigate, params }} />;
    }

    return ComponentWithRouterProp;
}

export { withRouter };

// Note: This file is taken from
// https://reactrouter.com/docs/en/v6/faq#what-happened-to-withrouter-i-need-it
