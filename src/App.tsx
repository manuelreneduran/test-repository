import "./App.css";
import { Dropdown } from "./components/Dropdown";
const options = ["Hello", "There", "My", "Friend"];

function App() {
  return <Dropdown options={options} onSelect={() => {}} />;
}

export default App;
