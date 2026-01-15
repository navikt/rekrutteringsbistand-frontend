import{aq as w,J as I,j as t,R as k,S as j,cn as x,cw as b,cv as g,co as u,O as y,cP as _}from"./iframe-D9efq7gm.js";import{w as m,c as D}from"./ContextDecorators-WYe_o80N.js";import{F as N,A as v}from"./FullførtStilling-ChVTwP1J.js";import{R as T}from"./GjenåpneStillingKnapp-hYTgGVQq.js";import{T as A}from"./TilgangskontrollForInnhold-DOUwsKs9.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Qovu6sPZ.js";import"./OrganisasjonsnummerAlert-zOlyC-ht.js";import"./VStack-D9lq_a4Y.js";import"./BasePrimitive-BzWnuIU4.js";import"./List-4TSCPVGQ.js";import"./Link-BHqVFeiD.js";import"./KandidatHendelseTag-CqGO6C7b.js";import"./Tag-VuDPtMMo.js";import"./ChatExclamationmark-DE2gpsk9.js";import"./FileXMark-BxcFT4qE.js";import"./Trash-D_YgXyyT.js";import"./HandShakeHeart-BIe_nHom.js";import"./Calendar-B870ooCh.js";import"./ThumbUp-C_Rne1Rb.js";import"./ExclamationmarkTriangle-DoHZ6yS1.js";import"./Table-m3oZFwvc.js";import"./index-BzgkzeDT.js";import"./index-B40KJ5b4.js";import"./util-M2qWKBBT.js";import"./DatoVelger-9lilGGRx.js";import"./useDatepicker-DENi9RPN.js";import"./useControllableState-CeE_Zg6y.js";import"./Modal-DPQxNsXa.js";import"./floating-ui.react-Bp_BnijO.js";import"./Date.Input-Dcou4NvS.js";import"./useFormField-BjBsX3sj.js";import"./ChevronDown-BkInPlEQ.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-dTbrXiSO.js";import"./Modal.context-BS_OZFTE.js";import"./Popover-D-tV0aE0.js";import"./DismissableLayer-wq39k6jE.js";import"./startOfMonth-CTI6ITKH.js";import"./Select-B3NDMnAB.js";import"./endOfMonth-BebmFCkp.js";import"./ArrowLeft-BX9xtEvg.js";import"./ArrowRight-6YoN78p1.js";import"./isSameDay-Xl4XhoYf.js";import"./Checkbox-BHV8fN8z.js";import"./Fieldset-DOzm4zyk.js";import"./accordion-PCq_J9Xl.js";import"./index-Bsp-orvJ.js";import"./index-C4lSUzQr.js";import"./index-BxtVhLeP.js";import"./Box-CwbpoWk4.js";import"./Bell-DKlFt9bY.js";import"./PersonChat-CThNUHPJ.js";import"./Eye-CyEN8ryr.js";import"./ProgressBar-CcEJUBN3.js";import"./useLatestRef-IhTPTW7u.js";import"./ShieldLock-Bw8qB3t4.js";import"./PadlockLocked-DtiNkhnx.js";import"./EyeSlash-DnDtFjcS.js";import"./CircleSlash-CM6yEjZ8.js";import"./Pencil-CbiadFAv.js";import"./FullførStillingModal-BY-hVYju.js";import"./PersonbrukerTekst-BkQHGIzb.js";import"./ClockDashed-CEKjrT1j.js";import"./IkonNavnAvatar-BBWTqKNK.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-CL7IDpsL.js";import"./ErrorBoundary-zP5RL6y5.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{o as Aktiv,l as AktivDropdown,p as FormidlingVariant,a as Fullført,Yt as default};
