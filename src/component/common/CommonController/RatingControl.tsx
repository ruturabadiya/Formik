import { ErrorMessage, useFormikContext } from "formik";
import StarRatings from "react-star-ratings";

interface StarRatingsControllerProps {
    name: string;
    onChange: (fieldName: string, fieldValue: any) => void;
  }
  
  export const StarRatingsController: React.FC<StarRatingsControllerProps> = ({ name, onChange }) => {
    const { values }: any = useFormikContext();
    const rating = values.rating.rate || 0;
  
    const handleRatingChange = (newRating: number) => {
      onChange(name, newRating);
    };
  
    return (
        <>
      <div className="star">
        <StarRatings
          rating={rating}
          starRatedColor="#ffd700"
          changeRating={handleRatingChange}
          numberOfStars={5}
          name={name}
        />
      </div>
      <div className='row p-0 m-0 w-100'>
      <ErrorMessage name={name} component="div" className="text-danger" />

      </div>
      </>
    );
  };