import{aw as I,I as w,j as t,R as k,S as j,cu as x,cD as b,cC as g,cv as u,N as y,cW as N}from"./iframe-YHW4kXZv.js";import{w as m,c as A}from"./ContextDecorators-DDTpUM0F.js";import{F as _,A as v}from"./FullførtStilling-Bj3C5Co2.js";import{R as T}from"./GjenåpneStillingKnapp-DF5Iv7TL.js";import{T as D}from"./TilgangskontrollForInnhold-CmcgS4e4.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BvkxYlct.js";import"./OrganisasjonsnummerAlert-DV8gw3L3.js";import"./VStack-Dp5vHBfm.js";import"./BasePrimitive-C-ojZHC8.js";import"./Box-1ghu6X00.js";import"./List-CQBFO1Og.js";import"./Link-DlrFKguL.js";import"./KandidatHendelseTag-LcSqDNI6.js";import"./Tag-BAyHvYyb.js";import"./ChatExclamationmark-DIOXg4cS.js";import"./FileXMark-CBMm6RAT.js";import"./Trash-D6xaqT6E.js";import"./HandShakeHeart-CqGmJPyT.js";import"./Calendar-CtAhEP7Z.js";import"./ThumbUp-DwgYdscX.js";import"./ExclamationmarkTriangle-DMpQqrc7.js";import"./Table-DDuqGOmb.js";import"./index-7WDwZ5Wk.js";import"./index-B40KJ5b4.js";import"./util-BiAbxkke.js";import"./DatoVelger-Bv7uB3IU.js";import"./useDatepicker-Dxx5jBBP.js";import"./useControllableState-DBDJpPfm.js";import"./Modal-eLu0JNFL.js";import"./floating-ui.react-Db5h8fgu.js";import"./useFormField-10iWKxpF.js";import"./ReadMore-CX7iw8aC.js";import"./ChevronDown-qlCMax07.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BQ4GNSxx.js";import"./Modal.context-C4wiLZa4.js";import"./Popover-BwGeo-R_.js";import"./DismissableLayer-BjppdLKT.js";import"./startOfMonth-BZyjjRU7.js";import"./Select-QXbXXGOl.js";import"./endOfMonth-CF-DVmXL.js";import"./ArrowLeft-Ln97DnKn.js";import"./ArrowRight-CyyjVGyD.js";import"./isSameDay-DgDO_5Wl.js";import"./Checkbox-Ce1keNuQ.js";import"./Fieldset-D2rZnLav.js";import"./accordion-CpolErDz.js";import"./index-D6o2nNi2.js";import"./index-mq3VlGu7.js";import"./index-BXXlQ2tV.js";import"./ProgressBar-BIiCFl2o.js";import"./useValueAsRef-ugXEHbCx.js";import"./Bell-Bm37IhPu.js";import"./PersonChat-BgTCYp_a.js";import"./Eye-gGrjMwv-.js";import"./ShieldLock-D-VjnOMj.js";import"./PadlockLocked-DC9fLY0n.js";import"./EyeSlash-m2wNWVQP.js";import"./CircleSlash-BzIYmOkh.js";import"./Pencil-Fvj561DJ.js";import"./FullførStillingModal-BzJXwbUr.js";import"./PersonbrukerTekst-NO1nTywt.js";import"./ClockDashed-Cw6GFD8C.js";import"./IkonNavnAvatar-HD63uNyp.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-Bg_M30BU.js";import"./ErrorBoundary-d2COiGWo.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(_,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=N,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
