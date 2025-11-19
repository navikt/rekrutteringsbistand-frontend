import{aI as I,Q as w,j as t,w as k,S as x,cx as j,cF as b,cE as g,cy as u,V as y,cU as _}from"./iframe-cNvDYj7l.js";import{w as m,c as A}from"./ContextDecorators-BHTx0zcp.js";import{F as N,A as v}from"./FullførtStilling--cFfbylY.js";import{R as T}from"./GjenåpneStillingKnapp-DH5XYEC5.js";import{T as E}from"./TilgangskontrollForInnhold-C9NRtD0M.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BAmXRz36.js";import"./OrganisasjonsnummerAlert-CpiVSjWb.js";import"./VStack-JibsGnmS.js";import"./BasePrimitive-DqmNEQu9.js";import"./List-DK1xahuz.js";import"./Link-AVBwjNvc.js";import"./KandidatHendelseTag-fFhFrEHY.js";import"./Tag-03263A3p.js";import"./ChatExclamationmark-Ca2PnbLB.js";import"./FileXMark-BZXi7hvX.js";import"./Trash-B01mwerR.js";import"./HandShakeHeart-C9POw-OF.js";import"./Calendar-CznEWYh4.js";import"./ThumbUp-BP06I1RD.js";import"./Table-C2dyBnAB.js";import"./util-BO8dQ6Pu.js";import"./parse-CHnOHq9q.js";import"./getDefaultOptions-DaEqWaoo.js";import"./parseISO-D1PtcTHl.js";import"./index-jQi9f5my.js";import"./index-B40KJ5b4.js";import"./isBefore-LeIH_LgQ.js";import"./util-DTlxcMph.js";import"./accordion-y1vM0X6W.js";import"./index-BhFfsWIv.js";import"./index-DOzEGSs9.js";import"./index-DiuiYZ5j.js";import"./ChevronDown-Dm9kwURF.js";import"./Box-CZ8e4cDK.js";import"./Bell-DHfRDJ7L.js";import"./PersonChat-Ci0H9oko.js";import"./Eye-B_0XCHtp.js";import"./ProgressBar-Bc3Q0ZOs.js";import"./EyeSlash-Dxa5jOAE.js";import"./CircleSlash-_GKToOuJ.js";import"./Modal-BFIseiIB.js";import"./floating-ui.react-BjwHDxaJ.js";import"./Date.Input-DtOJxiwF.js";import"./useFormField-Bz9GijUD.js";import"./useControllableState-Daldu6V6.js";import"./Modal.context-C7s7PBJK.js";import"./Checkbox-D-jzgyUs.js";import"./Fieldset-8J03w0vV.js";import"./Pencil-C5Qdh3WE.js";import"./PersonbrukerTekst-CkM46S7C.js";import"./ClockDashed-DPt3C_1Y.js";import"./Tasklist-61zIARR5.js";import"./ErrorBoundary-BJQ6x-Hy.js";function n({dropDown:r}){const{stillingsData:i,erEier:D}=I(),d=w(i,D),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};
