import { gql, useQuery } from "@apollo/client";
import { logUserOut } from "../apollo";


const SEESHOPS_QUERY = gql`
    query seeCoffeeshops($lastId: Int) {
    seeCoffeeshops(lastId:$lastId) {
      name
      updatedAt
    }
  }
`;

function Home() {
    const {loading, error, data} = useQuery(SEESHOPS_QUERY, {
        variables: {
            lastId: 0,
        }
    });
    const shops = data.seeCoffeeshops;
    console.log(shops.map((shop) => shop.name))


  return (
    <div>
        <h1>Welcome we did it.</h1>
        <button onClick={() => logUserOut()}>Log out now!</button>
    </div>
    
    );
  }
// function Home() {
//     return (
//     <div>
//         <h1>Welcome we did it.</h1>
//         <button onClick={() => logUserOut()}>Log out now!</button>
//     </div>
//     );
// }

export default Home;