import{av as I,T as w,j as t,x as k,S as x,cy as j,cG as b,cF as g,cz as u,X as y,c_ as _}from"./iframe-nRhSYCvZ.js";import{w as m,c as D}from"./ContextDecorators-Dax-5sfW.js";import{F as N,A as v}from"./FullførtStilling-bEy9Nc-M.js";import{R as T}from"./GjenåpneStillingKnapp-DchIicTs.js";import{T as A}from"./TilgangskontrollForInnhold-fRqAl3LC.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-uYh8gWUZ.js";import"./OrganisasjonsnummerAlert-DCsl607j.js";import"./VStack-PEvcQc95.js";import"./BasePrimitive-BIZiyU-w.js";import"./List-DBc6WJmZ.js";import"./Link-BZ0LHHL5.js";import"./KandidatHendelseTag-BE_yv2X7.js";import"./Tag-COzDOVW9.js";import"./ChatExclamationmark-BfStBVOL.js";import"./FileXMark-bdaafn80.js";import"./Trash-BqGjYOzn.js";import"./HandShakeHeart-aR12a-Mn.js";import"./Calendar-BZNwxc2P.js";import"./ThumbUp-D0pwDn3X.js";import"./Table-BdqMt9GS.js";import"./index-DPtEuWSC.js";import"./index-B40KJ5b4.js";import"./util-COFemefV.js";import"./DatoVelger-gT5nFmbH.js";import"./useDatepicker-BczvQLNF.js";import"./useControllableState-C3_wTSJE.js";import"./Modal-Bj0DOBfz.js";import"./floating-ui.react-nolZAvpl.js";import"./Date.Input-CVqKzlSL.js";import"./useFormField-Cwe4eWS0.js";import"./ChevronDown-BF2Hm28B.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-C47GNyJy.js";import"./Modal.context-BDOVP4V9.js";import"./Popover-Ct63q9cp.js";import"./DismissableLayer-Bb1GHrD4.js";import"./startOfMonth-6ZRtBUud.js";import"./Select-eVvtiVO1.js";import"./endOfMonth-DLT5L8Am.js";import"./ArrowLeft-DtlYobg8.js";import"./ArrowRight--0bpzgo_.js";import"./isSameDay-mefPInRD.js";import"./Checkbox-CV-ngx4w.js";import"./Fieldset-CEFnbb-u.js";import"./accordion-BuGIsR30.js";import"./index-DZZ_SLK6.js";import"./index-DvVudXkw.js";import"./index-BXXbKQXn.js";import"./Box-DCUzAc7Y.js";import"./Bell-Db_E5SlV.js";import"./PersonChat-BL62lYmp.js";import"./Eye-Cceh_uZA.js";import"./ProgressBar-C-LNEUPr.js";import"./useLatestRef-CqvnlZdY.js";import"./EyeSlash-C7x2GX2q.js";import"./CircleSlash-QI0OjKGm.js";import"./Pencil-C7q9YCFD.js";import"./FullførStillingModal-CH1qjGwS.js";import"./PersonbrukerTekst-DFwJnHo6.js";import"./ClockDashed-CTS-m7si.js";import"./umamiEvents-CYDHrNFb.js";import"./Tasklist-BRjra1Eu.js";import"./ErrorBoundary-DTHMwrRC.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ht={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Ht as default};
