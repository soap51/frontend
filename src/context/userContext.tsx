import { createContext, ReactNode, useContext, useReducer } from "react";

type IDispatcher = React.Dispatch<Partial<IContext>>

interface IContext {
    token?: string
}

const defaultContext: IContext = {
    token: undefined
}

interface IProviderResult {
    children: ReactNode
}

export const UserContext = createContext(defaultContext)
export const DispatcherContext = createContext<IDispatcher | undefined>(undefined)

export const UserProvider = ({children} : IProviderResult) => {
    const [state, dispatch] = useReducer(
    (
        appState: IContext,
        newValue: Partial<IContext>
    ) => ({
        ...appState,
        ...newValue
    }),
    defaultContext);
    
    return (
        <UserContext.Provider value={state}>
            <DispatcherContext.Provider value={dispatch}>
                {children}
            </DispatcherContext.Provider>
        </UserContext.Provider>
    )
}

export const useUseContext = () : [IContext, IDispatcher | undefined] => [useContext(UserContext), useContext(DispatcherContext)]