import Link from "next/link";
import React from "react";

import "./MainPage.styles.scss";

export default function MainPage() {
    return (
        <>
            <header>
                <div className="container">
                    <h1 className="text-4xl font-bold">TASKWAVE</h1>
                </div>
            </header>
            <main>
                <section className="bg-gradient-to-r from-indigo-500 to-red-500 ">
                    <div className="container hero-content flex justify-around items-center h-48">
                        <Link href="/auth">
                            <button className="px-6 py-2 font-medium bg-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] text-gray-900">
                                LOG IN
                            </button>
                        </Link>
                        <div className="flex justify-end flex-col items-end">
                            <h2 className="text-2xl font-semibold text-right">
                                Efficiently manage your tasks and time.
                            </h2>
                            <h3 className="w-2/3 text-right text-lg">
                                TaskWave combines task management, a Pomodoro
                                timer, and time blocks to help you stay
                                productive and organized.
                            </h3>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="grid justify-center grid-cols-[490px_500px] gap-8 mt-9">
                        <img
                            className="border-2 border-white p-2 rounded-xl"
                            src="/images/tasks.png"
                            alt="tasks"
                        />
                        <div>
                            <p className="text-2xl font-bold pt-5">
                                TASK MANAGEMENT
                            </p>
                            <p className="text-base mt-5">
                                Efficiently organize, prioritize, and track your
                                tasks with TaskWave. Create to-do lists, set
                                deadlines, and monitor your progress to stay
                                focused and accomplish your goals effectively.
                            </p>
                        </div>
                    </div>
                    <div className="grid justify-center grid-cols-[490px_500px] gap-8 mt-9">
                        <div>
                            <p className="text-2xl font-bold pt-5">
                                POMODORO TIMER
                            </p>
                            <p className="text-base mt-5">
                                In TaskWave, users can customize the work and
                                break intervals of the Pomodoro timer to any
                                duration they prefer
                            </p>
                        </div>
                        <img
                            className="border-2 border-white p-2 rounded-xl justify-self-end"
                            src="/images/pomodoro.png"
                            alt="tasks"
                        />
                    </div>
                    <div className="grid justify-center grid-cols-[490px_500px] gap-8 mt-9">
                        <img
                            className="border-2 border-white p-2 rounded-xl"
                            src="/images/time-blocking.png"
                            alt="tasks"
                        />
                        <div>
                            <p className="text-2xl font-bold pt-5">
                                TIME BLOCKING
                            </p>
                            <p className="text-base mt-5">
                                Time blocking in TaskWave enables users to
                                schedule their entire day by dividing it into
                                blocks of time, helping to prioritize tasks and
                                manage daily activities efficiently.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <section>
                <div className="bg-gradient-to-r from-indigo-500 to-red-500 h-24 mt-10 flex items-center justify-center p-5 ">
                    <h1 className="animated text-4xl font-bold">
                        <div>T</div>
                        <div>A</div>
                        <div>S</div>
                        <div>K</div>
                        <div></div>
                        <div>W</div>
                        <div>A</div>
                        <div>V</div>
                        <div>E</div>
                    </h1>

                    <Link href="/auth">
                        <button className="px-6 py-2 font-medium bg-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] text-gray-900">
                            Log in
                        </button>
                    </Link>
                </div>
            </section>

            <footer className="h-16 mt-10 text-center">
                <div>
                    <p>© 2024 TaskWave, Inc.</p>
                </div>
            </footer>
        </>
    );
}
