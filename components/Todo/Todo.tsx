import { useEffect, useState } from "react"
import Button from "../Button/Button"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/fire";
import { updateDoc } from "firebase/firestore";
type stu = {
    Name: string,
    Class: string,
    Batch: string,
    Gender: string,
    id: string
}

const Todo = () => {
    const [data, setData] = useState<stu[]>([])
    const [naming, setNaming] = useState<string>("")
    const [classing, setClassing] = useState<string>("")
    const [batching, setBatching] = useState<string>("")
    const [gendering, setGendering] = useState<string>("")
    const [flag, setFlag] = useState<Boolean>(false)
    const [updatedid, setUpdatedid] = useState<string>("")
    useEffect(() => {
        onDataRead()


    }, [])
    const alpha = (e: any) => {
        setNaming(e.target.value);


    }
    const beta = (e: any) => {
        setClassing(e.target.value);

    }
    const gema = (e: any) => {
        setBatching(e.target.value);

    }
    const peta = (e: any) => {
        setGendering(e.target.value);

    }
    const onDataRead = async () => {
        try {

            const querySnapshot = await getDocs(collection(db, "students"));
            let todosList: stu[] = []
            querySnapshot.forEach((doc) => {
                todosList.push({
                    Name: doc.data().Name,
                    Class: doc.data().Class,
                    Batch: doc.data().Batch,
                    id: doc.id,
                    Gender: doc.data().Gender

                });
            });

            console.log('todos', todosList);
            setData(todosList)


        } catch (error) {
            console.log(error);

        }

    }
    const onAddStudent = async () => {

        if (naming && classing && gendering && batching != "") {
            toast.success('👌 Data has been added', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            let AddStudent = {
                Name: naming,
                Class: classing,
                Batch: batching,
                Gender: gendering
            }

            setNaming("")
            setBatching("")
            setClassing("")
            setGendering("")
            try {
                const docRef = await addDoc(collection(db, "students"), AddStudent);
                console.log("Document written with ID: ", docRef.id);
                setData([...data, { ...AddStudent, id: docRef.id }])

            } catch (error) {
                console.log(error)

            }

        }
        else {
            toast.error('🙏 Ohh no,Please fill all fields', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

    }
    const onDeleteHandler = async (ding: string) => {
        let DeletedStudents = data.filter((valu) => {
            if (ding !== valu.id) {
                return valu;

            }


        })
        setData([...DeletedStudents])
        toast.warn('✌ Data successfully deleted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        try {
            await deleteDoc(doc(db, "students", `${ding}`));
        } catch (error) {
            console.log(error);


        }


    }
    const onUpdateHandler = (valueing: stu) => {

        setFlag(true)
        setUpdatedid(valueing?.id)
        setNaming(valueing.Name)
        setClassing(valueing.Class)
        setBatching(valueing.Batch)
        setGendering(valueing.Gender)

    }
    const onEditStudent = async () => {
        setFlag(false)
        if (naming && classing && gendering && batching != "") {
            toast.success('👌 Data has been Updated Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            let AddStudent: stu = {
                Name: naming,
                Class: classing,
                Batch: batching,
                Gender: gendering,
                

            }

            let UpdatedStudents = data.map((value) => {
                if (updatedid === value.id) {
                    return AddStudent;
                }
                else {
                    return value
                }

            })
            setData([...UpdatedStudents])

            setNaming("")
            setBatching("")
            setClassing("")
            setGendering("")

            try {
                const washingtonRef = doc(db, "students", `${updatedid}`);

                // Set the "capital" field of the city 'DC'
                await updateDoc(washingtonRef, AddStudent);

            } catch (error) {
                console.log(error)

            }


        }
        else {
            toast.error('🙏 Ohh no,Please fill all fields', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

    }
    return (
        <div>
            <div className="mb-5 mt-5 d-flex justify-content-center">
                <div className="card" style={{ width: "20rem" }}>

                    <div className="card-body">
                        <h5 className="text-center card-title">Input Form</h5>
                        <hr />
                        <div className="mb-3">
                            <input type="email" value={naming} className="form-control" placeholder="Enter your Name" onChange={alpha} />
                        </div>
                        <div className="mb-3">
                            <input type="email" value={classing} className="form-control" placeholder="Enter your Class" onChange={beta} />
                        </div>
                        <div className="mb-3">
                            <input type="email" value={batching} className="form-control" placeholder="Enter your Batch" onChange={gema} />
                        </div>
                        <div className="mb-3">
                            <input type="email" value={gendering} className="form-control" placeholder="Enter your Gender" onChange={peta} />
                        </div>
                        <div className="text-center">
                            {
                                flag ? <Button onClickHandler={onEditStudent} value="Update Student" color="btn btn-warning" /> :

                                    <Button onClickHandler={onAddStudent} value="Add Student" color="btn btn-primary" />}

                        </div>


                    </div>
                </div>

            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Class</th>
                        <th scope="col">Batch</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Update</th>
                    </tr>
                </thead>
                {
                    data.map((value:stu, index) => {
                        return (
                            <tbody>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{value.Name}</td>
                                    <td>{value.Class}</td>
                                    <td>{value.Batch}</td>
                                    <td>{value.Gender}</td>
                                    <td>
                                        <Button onClickHandler={() => onDeleteHandler(value.id)} value="Delete" color="btn btn-danger" />
                                    </td>
                                    <td>
                                        <Button onClickHandler={() => onUpdateHandler(value)} value="Update" color="btn btn-success" />
                                    </td>
                                </tr>

                            </tbody>
                        )

                    })
                }

            </table>


        </div>
    )
}
export default Todo