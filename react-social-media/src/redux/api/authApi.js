import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8800/api/auth',
        prepareHeaders: (headers, { getState }) => {
            // 添加以下行来启用 withCredentials
            headers.set('withCredentials', 'true');
            return headers;
          },
    }),
    endpoints:builder=>({
        register:builder.mutation({
            query:(user)=>{
                return {
                    url:`/register`,
                    method:'post',
                    body:user
                }
            }
        }),
        login:builder.mutation({
            query:(user)=>{
                return {
                    url:`/login`,
                    method:'post',
                    body:user //payload 
                    

                }
            }
        }),
        logout:builder.mutation({
            query:()=>{
                return {
                    url:`/logout`,
                    method:'post',
                    body:{} //payload   
                }
            }
        })
    })
})
export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = authApi
export default authApi