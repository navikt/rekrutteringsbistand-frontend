import{aq as I,J as w,j as t,R as k,S as j,cz as x,cI as b,cH as g,cA as u,O as y,c$ as _}from"./iframe-B2tryd13.js";import{w as m,c as D}from"./ContextDecorators-B8ZDImyr.js";import{F as N,A as v}from"./FullførtStilling-CQU_uNcY.js";import{R as T}from"./GjenåpneStillingKnapp-Dd7uRIzc.js";import{T as A}from"./TilgangskontrollForInnhold-5BrhlYK5.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DT7g8MGk.js";import"./OrganisasjonsnummerAlert-CLtGQX1Q.js";import"./VStack-CpoSlYhk.js";import"./BasePrimitive-Bi6JzUQi.js";import"./List-CYyAh4XV.js";import"./Link-BX-rTweX.js";import"./KandidatHendelseTag-pIWDNAUj.js";import"./Tag-Co9kyAHI.js";import"./ChatExclamationmark-htJQIgl5.js";import"./FileXMark-RNZSYO6O.js";import"./Trash-C5oGf-Fb.js";import"./HandShakeHeart-CEno8NIK.js";import"./Calendar-BaL8G25p.js";import"./ThumbUp-CGTtj9x5.js";import"./ExclamationmarkTriangle-De3rYfmn.js";import"./Table-D51Rf6zr.js";import"./index-D7Wk16A6.js";import"./index-B40KJ5b4.js";import"./util-BbPUv3M_.js";import"./DatoVelger-D2c1Wqyd.js";import"./useDatepicker-DrXx6Tlp.js";import"./useControllableState-C0QJmmOx.js";import"./Modal-LawZZxyM.js";import"./floating-ui.react-DSsUI2b0.js";import"./Date.Input-CQ6krd-H.js";import"./useFormField-Br51i2gO.js";import"./ChevronDown-By_C_7Bd.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BX_HQuof.js";import"./Modal.context-b7jcTHLm.js";import"./Popover-DaxU5DVu.js";import"./DismissableLayer-LPannaoJ.js";import"./startOfMonth-Dywu524e.js";import"./Select-DvMp3GKT.js";import"./endOfMonth-2juzQeWq.js";import"./ArrowLeft-M5yKcjQL.js";import"./ArrowRight-_wqejDRf.js";import"./isSameDay-BSpSqdOw.js";import"./Checkbox-7ReXNOrk.js";import"./Fieldset-BKBnkvcs.js";import"./accordion-C52Kn_MH.js";import"./index-57kN_8Ac.js";import"./index-Dsv_Hoyq.js";import"./index-CXxNnlhJ.js";import"./Box-CBaDthZZ.js";import"./Bell-CNUBRyQw.js";import"./PersonChat-zRHkrAP3.js";import"./Eye-CxQESjAe.js";import"./ProgressBar-C4NnCa52.js";import"./useLatestRef-0N3qYMzZ.js";import"./ShieldLock-DaN3nvxp.js";import"./PadlockLocked-COak_8uI.js";import"./EyeSlash-D8J8bRmF.js";import"./CircleSlash-LAtFfPhA.js";import"./Pencil-DWemSD5x.js";import"./FullførStillingModal-D_U8jDOY.js";import"./PersonbrukerTekst-D4_TKsFx.js";import"./ClockDashed-DZBxV81Z.js";import"./IkonNavnAvatar-CMvd0cW0.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-7v3i1My3.js";import"./ErrorBoundary-9Q9j6Ish.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Xt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{o as Aktiv,l as AktivDropdown,p as FormidlingVariant,a as Fullført,Xt as default};
