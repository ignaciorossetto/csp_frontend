import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const LoadingSpinner = ({classes}: {classes:string}) => {
  return (
    <FontAwesomeIcon icon={faSpinner} spin className={`${classes && classes} text-center`}/>
  )
}

export default LoadingSpinner