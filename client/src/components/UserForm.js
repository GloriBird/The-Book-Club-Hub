import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import styled from "styled-components";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const { firstName, setFirstName } = useState("");
  const { lastName, setLastName } = useState("");
  const { userName, setUserName } = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //   useEffect(() => {
  //     fetch("/api/get-reservations")
  //       .then((res) => res.json())
  //       .then((customersData) => {
  //         return setIsCurrentCustomers(customersData.data);
  //       });
  //   }, []);

  //   const customerExists = isCurrentCustomers.some((user) => {
  //     if (user.email === email) {
  //       return true;
  //     } else if (user.email === undefined || user.email !== email) {
  //       return false;
  //     }
  //   });

  //   const submitCustomerInfo = (e) => {
  //     e.preventDefault();
  //     setIsLoading(true);
  //     const userData = { flight, seat, givenName, surname, email };
  //     fetch("/api/add-reservation", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(userData),
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw Error(`It's broken`);
  //         }
  //         return response.json();
  //       })
  //       .then((dataResult) => {
  //         setLastCustomerID(dataResult.data.insertedId);
  //       });
  //     setTimeout(() => {
  //       setIsLoaded(true);
  //       setGivenName("");
  //       setSurname("");
  //       setEmail("");
  //       return history.push(`/confirmed`);
  //     }, 2000);
  //   };

  return (
    <Container>
      <form onSubmit={submitCustomerInfo}>
        <div>
          <label for="firstName"></label>
          <input
            type="text"
            name="Name"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label for="lastName"></label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <label for="userName"></label>
          <input
            type="text"
            name="userName"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <ConfirmButton
            type="submit"
            value="Confirm"
            changeOpacity={firstName.length > 0 && lastName.length > 0 && userName.length > 0}
            disabled={firstName.length < 1 || lastName.length < 1 || userName.length < 1}
          >
            {isLoading ? "Loading..." : "Submit"}
          </ConfirmButton>
        </div>
      </form>
    </Container>
  );
};

export default Profile;

const Container = styled.div`
  border: 2px solid blue;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  align-self: center;
  height: 100vh;

  img {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 2px solid blue;
  }

  ul {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  li {
    list-style: none;
    border: 2px solid red;
  }
`;

const ConfirmButton = styled.button`
  width: 80%;
  border-radius: 5px;
  color: white;
  background-color: var(--color-cadmium-red);
  opacity: ${(props) => (props.changeOpacity ? 1 : 0.2)};
`;
