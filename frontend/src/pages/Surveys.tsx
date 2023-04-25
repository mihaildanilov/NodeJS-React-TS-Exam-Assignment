import PageComponent from '../components/PageComponent';
import { useStateContext } from '../context/ContextProvider';

const Surveys = () => {
	const { surveys } = useStateContext();
	console.log(surveys);
	return (
		<>
			<PageComponent title="Surveys">
				{' '}
				Surveys content
				{/* {surveys.map(survey =>(
				
			))} */}
			</PageComponent>
		</>
	);
};

export default Surveys;
