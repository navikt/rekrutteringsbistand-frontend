import{aw as I,I as w,j as t,R as k,S as x,cx as j,cG as b,cF as g,cy as u,N as y,cZ as N}from"./iframe-D8l9BGis.js";import{w as m,c as D}from"./ContextDecorators-KmkLxdOV.js";import{F as _,A as v}from"./FullførtStilling-BSqYqq0y.js";import{R as T}from"./GjenåpneStillingKnapp-B_r8JunC.js";import{T as A}from"./TilgangskontrollForInnhold-CXMJCWpf.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext--tuHKiNq.js";import"./OrganisasjonsnummerAlert-DQLutb3A.js";import"./VStack-B0hY9ntf.js";import"./BasePrimitive-DQuU5A7Q.js";import"./Box-DWh8wLnh.js";import"./List-D4rYQwke.js";import"./Link-nD0NnHfS.js";import"./KandidatHendelseTag-BG0GYoSg.js";import"./Tag-Qlq6vGjg.js";import"./ChatExclamationmark-DnSlsKaK.js";import"./FileXMark-aV0bDqes.js";import"./Trash-CtYOsaOd.js";import"./HandShakeHeart-CK2uE5i6.js";import"./Calendar-DjYZmVha.js";import"./ThumbUp-CsBZxtY2.js";import"./Table-CwSmWQEg.js";import"./index-DflwV3gF.js";import"./index-B40KJ5b4.js";import"./util-CAbY6blA.js";import"./DatoVelger-CiIxYSC0.js";import"./useDatepicker-C7xamgMH.js";import"./useControllableState-CSpkSaA9.js";import"./Modal-4q45ceiu.js";import"./floating-ui.react-uksW3Zsc.js";import"./useFormField-CaB6me-E.js";import"./ReadMore-VortQHAm.js";import"./ChevronDown-DmqUgsk9.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BiVm7P29.js";import"./Modal.context-QsBti5gJ.js";import"./Popover-BkTsGPkC.js";import"./DismissableLayer-oyTpsV4W.js";import"./startOfMonth-B2_bhxtO.js";import"./Select-D9b8qZ-q.js";import"./endOfMonth-CeRiPgfs.js";import"./ArrowLeft-DfHhl449.js";import"./ArrowRight-CNB6HC0n.js";import"./isSameDay-BYzohp6f.js";import"./Checkbox-D1D9Gay4.js";import"./Fieldset-BN5AlA83.js";import"./accordion-BqnXXhWD.js";import"./index-BVuyDTlj.js";import"./index-DiXxOV9x.js";import"./index-Dr87V9wM.js";import"./ProgressBar-BkZc2IoM.js";import"./useValueAsRef-CrCnaSgK.js";import"./Bell-C4Q5dWRW.js";import"./PersonChat-4paPMk7y.js";import"./Eye-D3t-iRH9.js";import"./ShieldLock-CMyAAPmR.js";import"./PadlockLocked--TR-JQMO.js";import"./EyeSlash-JE0ckBYE.js";import"./CircleSlash-DCzrjBRS.js";import"./Pencil-B6p6FOyY.js";import"./FullførStillingModal-DzAsJMuh.js";import"./PersonbrukerTekst-CD0OdxL5.js";import"./ClockDashed-G-8FiXo5.js";import"./IkonNavnAvatar-xSi4L4gM.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-BhX42ILn.js";import"./ErrorBoundary-CrmIG-4W.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(_,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Qt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=N,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{o as Aktiv,l as AktivDropdown,p as FormidlingVariant,a as Fullført,Qt as default};
