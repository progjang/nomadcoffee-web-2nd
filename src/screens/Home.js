import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { logUserOut } from "../apollo";
import PageTitle from "../components/PageTitle";
import { Image } from "../components/shared";
import { Slider } from "../components/Slider";
import routes from "../routes";

const Container = styled.div`
  padding-bottom: 50px;
`;

const ShopList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 60px 20px;
`;

const ShopItem = styled.li``;

const ShopMain = styled.div`
  position: relative;
`;

const ShopName = styled.strong`
  position: absolute;
  left: 0;
  right: 0;
  top: 20px;
  text-align: center;
  padding: 10px;
  background-color: rgb(255 255 255 / 30%);
`;

const BigImg = styled.img`
  width: 100%;
`;

const ImageItem = styled.li`
  width: 100px;
  height: 100px;
  & + & {
    margin-left: 5px;
  }
`;

const SmallImage = styled.img`
  width: 100%;
  height: 100%;
`;

const CategoryItem = styled.li`
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.accent};
  color: ${(props) => props.theme.accent};
  padding: 5px 15px;
  & + & {
    margin-left: 5px;
  }
`;

const UserBox = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  background-color: rgb(255 255 255 / 30%);
  padding: 4px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SLink = styled(Link)`
  cursor: pointer;
`;

export const SEESHOPS_QUERY = gql`
  query seeCoffeeshops($lastId: Int) {
    seeCoffeeshops(lastId: $lastId) {
      id
      name
      user {
        id
        avatarURL
      }
      photos {
        url
      }
      categories {
        name
        slug
      }
    }
  }
`;

function Home() {
  const {loading, error, data} = useQuery(SEESHOPS_QUERY
    , {
      variables: { 
      }
  }
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <>
    <Container>
      <PageTitle title={"Home"} />
      <ShopList>
        {data?.seeCoffeeshops?.map((shop) => (
          <ShopItem key={shop?.id}>
            <SLink to={routes.shopDetail(shop?.id)}>
              <ShopMain>
                <ShopName>{shop?.name}</ShopName>
                <BigImg src={shop?.photos ? shop?.photos[0]?.url : ""} />
                <UserBox>
                  <Image sizes={"80px"} src={shop?.user?.avatarURL || ""} />
                </UserBox>
              </ShopMain>
            </SLink>
            <Slider slideWidth={100}>
              {shop?.photos?.map((photo) => (
                <ImageItem key={`photo${photo?.url}`}>
                  <SmallImage src={photo?.url} />
                </ImageItem>
              ))}
            </Slider>
            <Slider slideWidth={100}>
              {shop?.categories?.map((category) => (
                <CategoryItem key={`category${category?.name}_${shop?.id}`}>
                  {category?.name}
                </CategoryItem>
              ))}
            </Slider>
          </ShopItem>
        ))}
      </ShopList>
    </Container>
    <div>
        <h1>Welcome we did it.</h1>
        <button onClick={() => logUserOut()}>Log out now!</button>
    </div>
    </>
  )
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