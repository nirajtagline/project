// import { useDispatch, useSelector } from "react-redux";
// import { getStudentsDetails } from "../../../redux/actions";
// import { useParams } from "react-router-dom";
const StudentDetails = () => {
  // const dispatch = useDispatch();
  // const param = useParams();

  // const {
  //   studentDetails: { data = [] },
  // } = useSelector(({ allStudentData }) => allStudentData);

  // useEffect(() => {
  //   dispatch(getStudentsDetails(param));
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return {
    /*
    <div className="student-list-table-wrapper">
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>email</th>
            <th>id</th>
            <th></th>
          </tr>
          {data?.map((student) => {
            const { _id, name, email,Result } = student;
            return (
              <tr>
                <td>{name}</td>
                <td>{email}</td>
                <td>{_id}</td>
              </tr>
             {Result?.map((resu) =>{
               return(
                {resu?.studentAnswer?.map((que) => {
                  return(
                    <>
                    <li>
                    <span>{que.question}</span>
                    </li>
                    <li>
                    <span>{que.answer}</span>
                    </li>
                    </>
                  )
                })}
              </tr>
               )
             })}
        
            );
          })}
        </tbody>
      </table>
    </div>
  */
  };
};

export default StudentDetails;
