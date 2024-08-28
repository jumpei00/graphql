import { useQuery, gql } from "@apollo/client";

export default function App() {
    const GET_USERS = gql`
        query GetUsers {
            user {
                id
                username
                mailaddress
                createdAt
                updatedAt
            }
        }
    `;

    const { loading, error, data } = useQuery(GET_USERS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;
  return data.locations.map(({ id, username, mailaddress, createdAt, updatedAt }) => (
    <div key={id}>
      <p>{`User: ${username}`}</p>
      <p>{`Mail: ${mailaddress}`}</p>
      <p>{`Created: ${createdAt}`}</p>
      <p>{`Updated: ${updatedAt}`}</p>
    </div>
  ));
}
