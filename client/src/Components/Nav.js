import { Link, useNavigate } from "react-router-dom";
export default function Nav({ open }) {
  const navigate = useNavigate();
  let json;

  const handleDashboard = async () => {
    console.log(localStorage.authToken);
    const response = await fetch("http://localhost:3001/dashboard/dashboard", {
      method: "POST",
      body: JSON.stringify({ Token: localStorage.authToken }),
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },

      header: "Access-Control-Allow-Origin: *",
    });
    json = await response.json();
    console.log("response we get");
    console.log(json);
    navigate("/dashboard", { state: { id: json.id } });
  };

  const handlelogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
    console.log("loggedout");
  };
  const handleSocialize = () => {
    
    navigate("/");
   
  };

  return (
    <div>
      <div>
        <ul className="flex  bg-sky-900 text-white w-[100%] p-5">
          <h1 className="text-3xl font-bold  bg-sky-900 text-white  ">
            navbar
          </h1>
          <li>
            <Link to="/">home </Link>
          </li>
          {!localStorage.getItem("authToken") ? (
            <div>
              <li>
                <button
                  onClick={() => {
                    open[0](true);
                  }}
                >
                  LOGIN
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    open[1](true);
                  }}
                >
                  signup
                </button>
              </li>
            </div>
          ) : (
            <div>
              <li>
                <button onClick={handlelogout}>LOGOUT</button>
              </li>
              <li>
                <button onClick={handleDashboard}>Dashboard</button>
              </li>
              <li>
                <button onClick={handleSocialize}>Socialize</button>
              </li>
            </div>
          )}
        </ul>
      </div>
      {/* {open && <LoginModal closemod={Open}/>} */}
    </div>
  );
}
