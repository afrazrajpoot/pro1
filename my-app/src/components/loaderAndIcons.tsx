"use client";

export const Loader = () => {
  return (
    <>
      <main className="h-[100vh] w-[100vw] flex justify-center items-center">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20vw"
            height="20vw"
            viewBox="0 0 24 24"
          >
            <path
              fill="#8751bd"
              d="M2,12A11.2,11.2,0,0,1,13,1.05C12.67,1,12.34,1,12,1a11,11,0,0,0,0,22c.34,0,.67,0,1-.05C6,23,2,17.74,2,12Z"
            >
              <animateTransform
                attributeName="transform"
                dur="0.6s"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 12;360 12 12"
              ></animateTransform>
            </path>
          </svg>
        </div>
      </main>
    </>
  );
};
export const SignupIcon = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10vw"
        height="10vw"
        viewBox="0 0 24 24"
        className="cursor-pointer"
      >
        <path
          fill="currentColor"
          d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h4.2q.35-.9 1.1-1.45T12 1q.95 0 1.7.55T14.8 3H19q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm7-16.75q.325 0 .538-.213t.212-.537q0-.325-.213-.537T12 2.75q-.325 0-.537.213t-.213.537q0 .325.213.538T12 4.25M12 13q1.45 0 2.475-1.025T15.5 9.5q0-1.45-1.025-2.475T12 6q-1.45 0-2.475 1.025T8.5 9.5q0 1.45 1.025 2.475T12 13m-7 6h14v-1.15q-1.35-1.325-3.137-2.087T12 15q-2.075 0-3.863.763T5 17.85z"
        />
      </svg>
    </>
  );
};
export const LoginIcon = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="7vw"
        height="7vw"
        viewBox="0 0 24 24"
      >
        <g
          fill="black"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        >
          <g fillOpacity={0}>
            <path
              strokeDasharray={20}
              strokeDashoffset={20}
              d="M10 5C11.66 5 13 6.34 13 8C13 9.65685 11.6569 11 10 11C8.3431 11 7 9.65685 7 8C7 6.34315 8.3431 5 10 5z"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.4s"
                values="20;0"
              ></animate>
            </path>
            <path
              strokeDasharray={36}
              strokeDashoffset={36}
              d="M10 15C14 15 17 17 17 18V19H3V18C3 17 6 15 10 15z"
              opacity={0}
            >
              <set attributeName="opacity" begin="0.5s" to={1}></set>
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="0.5s"
                dur="0.4s"
                values="36;0"
              ></animate>
            </path>
            <animate
              fill="freeze"
              attributeName="fill-opacity"
              begin="0.9s"
              dur="0.15s"
              values="0;0.3"
            ></animate>
          </g>
          <path
            strokeDasharray={6}
            strokeDashoffset={6}
            d="M18 11h4"
            opacity={0}
          >
            <set attributeName="opacity" begin="1.1s" to={1}></set>
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="1.1s"
              dur="0.2s"
              values="6;0"
            ></animate>
          </path>
          <path
            strokeDasharray={6}
            strokeDashoffset={6}
            d="M20 9v4"
            opacity={0}
          >
            <set attributeName="opacity" begin="1.3s" to={1}></set>
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="1.3s"
              dur="0.2s"
              values="6;0"
            ></animate>
          </path>
        </g>
      </svg>
    </>
  );
};
