import{bZ as s,cS as t,j as e,cV as o,cW as l,dp as u,cX as b,cY as c,dq as S,dr as p,ds as x,dt as r,du as a,dv as m,dw as d,dx as i,dy as h,d0 as j,cT as v,dz as M,d5 as I}from"./iframe-D9mqkd8J.js";import"./preload-helper-BWMAHTUm.js";/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["polyline",{points:"22 12 16 12 14 15 10 15 8 12 2 12",key:"o97t9d"}],["path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",key:"oot6mr"}]],f=s("inbox",g);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],B=s("settings",k);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],y=s("users",N),H={tags:["autodocs"],component:t,args:{}},n={render:()=>e.jsx(t,{children:e.jsxs("div",{className:"flex h-[480px] w-full border rounded-md overflow-hidden",children:[e.jsxs(o,{children:[e.jsx(l,{children:e.jsx(u,{placeholder:"Søk..."})}),e.jsxs(b,{children:[e.jsxs(c,{children:[e.jsx(S,{children:"Hoved"}),e.jsx(p,{children:e.jsxs(x,{children:[e.jsx(r,{children:e.jsxs(a,{isActive:!0,tooltip:"Innboks",children:[e.jsx(f,{})," ",e.jsx("span",{children:"Innboks"})]})}),e.jsx(r,{children:e.jsxs(a,{tooltip:"Brukere",children:[e.jsx(y,{})," ",e.jsx("span",{children:"Brukere"})]})}),e.jsxs(r,{children:[e.jsxs(a,{tooltip:"Innstillinger",children:[e.jsx(B,{})," ",e.jsx("span",{children:"Innstillinger"})]}),e.jsxs(m,{children:[e.jsx(d,{children:e.jsx(i,{isActive:!0,children:"Profil"})}),e.jsx(d,{children:e.jsx(i,{children:"Varsler"})})]})]})]})})]}),e.jsx(h,{})]}),e.jsx(j,{className:"text-xs text-muted-foreground px-2",children:e.jsx("div",{children:"v1.0.0"})})]}),e.jsxs(v,{className:"p-4 flex flex-col gap-4",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(M,{}),e.jsx("h3",{className:"font-semibold",children:"Innhold"})]}),e.jsx("p",{className:"text-sm max-w-prose",children:"Dette er en minimal demonstrasjon av sidebaren. Bruk toggle-knappen for å kollapse/utvide og se tooltip oppførsel."}),e.jsx(I,{children:"Primær handling"})]})]})})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <SidebarProvider>
      <div className='flex h-[480px] w-full border rounded-md overflow-hidden'>
        <Sidebar>
          <SidebarHeader>
            <SidebarInput placeholder='Søk...' />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Hoved</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive tooltip='Innboks'>
                      <InboxIcon /> <span>Innboks</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip='Brukere'>
                      <UsersIcon /> <span>Brukere</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip='Innstillinger'>
                      <SettingsIcon /> <span>Innstillinger</span>
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton isActive>
                          Profil
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>Varsler</SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
          </SidebarContent>
          <SidebarFooter className='text-xs text-muted-foreground px-2'>
            <div>v1.0.0</div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className='p-4 flex flex-col gap-4'>
          <div className='flex items-center gap-2'>
            <SidebarTrigger />
            <h3 className='font-semibold'>Innhold</h3>
          </div>
          <p className='text-sm max-w-prose'>
            Dette er en minimal demonstrasjon av sidebaren. Bruk toggle-knappen
            for å kollapse/utvide og se tooltip oppførsel.
          </p>
          <Button>Primær handling</Button>
        </SidebarInset>
      </div>
    </SidebarProvider>
}`,...n.parameters?.docs?.source}}};export{n as Standard,H as default};
