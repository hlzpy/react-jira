import { useEffect, useState } from "react"
import { cleanObject, useDebounce, useMount } from "../../utils";
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import * as qs from "qs";
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const debounceValue = useDebounce(param, 1000);
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceValue))}`).then(res => {
      if (res.ok) {
        res.json().then(setList);
      }
    })
  }, [debounceValue]);
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async res => {
      if (res.ok) {
        setUsers(await res.json());
      }
    })
  });
  return <div>
    <SearchPanel param={param} setParam={setParam} users={ users} />
    <List list={list} users={users} />
  </div>
}