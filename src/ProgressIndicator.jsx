import { useState, useEffect } from "react"
const ProgressIndicator = ({responseCount, questionCount}) => {
    return (
    <div>You have completed {responseCount} out of {questionCount} questions.<br/><br/></div>
    )
};

export default ProgressIndicator;