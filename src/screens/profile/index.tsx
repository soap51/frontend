import { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Card, Text, InputForm } from "../../components";
import { FONT_TYPE } from "../../constant";
import { useUseContext } from "../../context/userContext";
import { getProfile, STORAGE_KEY, updateProfile } from "../../networks/api";
import "./style.css";
export const ProfileScreen = () => {
  let { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [name, setName] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setContext] = useUseContext();
  const logout = () => {
    localStorage.removeItem(STORAGE_KEY.TOKEN);
    if (setContext) {
      setContext({ token: undefined });
    }

    history.replace("/login");
  };
  const fetchProfile = useCallback(async () => {
    try {
      const profile = await getProfile({ id });
      setName(profile.name);
    } catch (err) {
      if (err.response) {
        setErrorMessage(err.response.data.message);
      }
    }
  }, [id]);
  const onUpdateProfile = async () => {
    try {
      if (updateName) {
        const updatedProfile = await updateProfile({ id, name: updateName });
        setName(updatedProfile.name);
        setUpdateName("");
        setErrorMessage("");
      } else {
        setErrorMessage("Name cannot be empty");
      }
    } catch (err) {
      if (err.response) {
        setErrorMessage(err?.response?.data?.message);
      }
    }
  };
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);
  return (
    <div className="profile-screen">
      <Card>
        <Text fontSize="h1">{"Profile"}</Text>
        <Text>Name : {name}</Text>
        {errorMessage && <Text type={FONT_TYPE.ERROR}>{errorMessage}</Text>}
        <InputForm
          placeholder="Name"
          value={updateName}
          onChange={(e) => setUpdateName(e.target.value)}
        />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Button type="button" onClick={onUpdateProfile}>
            {"Update"}
          </Button>
          <Button type="submit" onClick={logout}>
            {"Logout"}
          </Button>
        </div>
      </Card>
    </div>
  );
};
