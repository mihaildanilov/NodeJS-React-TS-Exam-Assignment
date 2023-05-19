import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStarRegular } from '@fortawesome/free-regular-svg-icons';
interface RatingProps {
	rating: number;
	numberOfReviews?: number;
	caption?: string;
}

const Rating = (props: RatingProps) => {
	const { rating, numberOfReviews, caption } = props;
	return (
		<div className="">
			<span>
				<FontAwesomeIcon
					icon={rating >= 1 ? faStar : rating >= 0.5 ? faStarHalfAlt : farStarRegular}
				/>
			</span>
			<span>
				<FontAwesomeIcon
					icon={rating >= 2 ? faStar : rating >= 1.5 ? faStarHalfAlt : farStarRegular}
				/>
			</span>
			<span>
				<FontAwesomeIcon
					icon={rating >= 3 ? faStar : rating >= 2.5 ? faStarHalfAlt : farStarRegular}
				/>
			</span>
			<span>
				<FontAwesomeIcon
					icon={rating >= 4 ? faStar : rating >= 3.5 ? faStarHalfAlt : farStarRegular}
				/>
			</span>
			<span>
				<FontAwesomeIcon
					icon={rating >= 5 ? faStar : rating >= 4.5 ? faStarHalfAlt : farStarRegular}
				/>
			</span>
			{caption ? (
				<span>{caption}</span>
			) : numberOfReviews != null && numberOfReviews !== 0 ? (
				<span>{' ' + numberOfReviews + ' reviews'}</span>
			) : (
				<span />
			)}
		</div>
	);
};

export default Rating;
