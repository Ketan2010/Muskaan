import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  margin-top:35%;
  align-items: center;
  background-color: #fff;
  padding: 5px;
 
`;

export const Card = styled.View`
    background-color: #f8f8f8;
    width: 100%;
    margin-bottom: 2px;
    border-radius: 30px;
    box-shadow: 5px 10px #888888;

`;

export const UserInfo = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    padding: 8px;
`;

export const UserImg = styled.Image`
    width: 50px;
    height: 50px;
    border-width: 1px;
    border-radius: 25px;
    padding:7px;
`;

export const UserInfoText = styled.View`
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
`;

export const UserName = styled.Text`
    font-size: 14px;
    font-weight: bold;
    font-family: 'Lato-Regular';
`;

export const PostLocation = styled.Text`
    font-size: 12px;
    font-family: 'Lato-Regular';
    color: #666;
`;

export const PostTime = styled.Text`
    font-size: 12px;
    font-family: 'Lato-Regular';
    color: #666;
    margin-left: 15px;
    padding-bottom: 5px;
`;

export const PostText = styled.Text`
    font-size: 14px;
    font-family: 'Lato-Regular';
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 5px;
    margin-top: 10px;
`;

export const PostImg = styled.Image`
    width: 100%;
    height: 250px;
    /* margin-top: 15px; */
`;

export const Divider = styled.View`
    border-bottom-color: #dddddd;
    border-bottom-width: 1px;
    width: 92%;
    align-self: center;
    margin-top: 15px;
`;

export const InteractionWrapper = styled.View`
    flex-direction: row;
    padding-left: 10px;
`;

export const Interaction = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    border-radius: 5px;
    
    
`;

export const InteractionText = styled.Text`
    font-size: 12px;
    font-family: 'Lato-Regular';
    font-weight: bold;
    color: ${props => props.active ? '#2e64e5' : '#333'};
    margin-top: 5px;
    margin-left: 5px;
`;