import Part from "./Part.jsx";

const Content = ({parts}) => {
    return parts.map(part => <Part key={part.name} name={part.name} exercises={part.exercises}/>)
}

export default Content