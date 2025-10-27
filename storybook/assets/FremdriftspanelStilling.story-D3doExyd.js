import{am as w,an as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,aK as y,cw as _}from"./iframe-DX9y8s0p.js";import{w as m,c as D}from"./ContextDecorators-Cjlwqje6.js";import{F as N,A as v}from"./FullførtStilling-Cv3sW0Ab.js";import{R as T}from"./GjenåpneStillingKnapp-BeP6JjZk.js";import{T as A}from"./TilgangskontrollForInnhold-BcFKGEap.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BgGQs1aF.js";import"./OrganisasjonsnummerAlert-wq-PWVhe.js";import"./VStack-BuoRLqFc.js";import"./BasePrimitive-n7t3DUXz.js";import"./List-CRuB2vXR.js";import"./Link-CE8mhjrR.js";import"./KandidatHendelseTag-DAfkQLOm.js";import"./Tag-DLJApF3O.js";import"./ChatExclamationmark-BaemJk_4.js";import"./FileXMark-BkK3__05.js";import"./Trash-Bd87jGlN.js";import"./HandShakeHeart-D0v5wORh.js";import"./Calendar-BTafpFij.js";import"./ThumbUp-DrDogaZf.js";import"./Table-DJuofRSv.js";import"./util-BeOVg5eS.js";import"./format-Dx5xwboz.js";import"./match-B_ykZKeH.js";import"./parse-BBuikJwA.js";import"./getDefaultOptions-Btv2vEbm.js";import"./parseISO-vl75CQb4.js";import"./index-Be7PHb8R.js";import"./index-B40KJ5b4.js";import"./isBefore-8anyI0-P.js";import"./util-BEto0Asq.js";import"./accordion-C_Jz6sxR.js";import"./index-l5BYak7n.js";import"./index-DA77VhOb.js";import"./index-XIAkA15o.js";import"./ChevronDown-kOA26EDn.js";import"./Box-D24OqPhg.js";import"./Bell-D4haJ3nK.js";import"./PersonChat-3s43jqH8.js";import"./Eye-DJgiqdfJ.js";import"./ProgressBar-DcykqTLd.js";import"./EyeSlash-AWV0nn4C.js";import"./CircleSlash-unWCY0OS.js";import"./Modal-B37y99Mo.js";import"./floating-ui.react-Cf24XkUu.js";import"./Date.Input-BDB_uQzU.js";import"./useFormField-DGeky4xf.js";import"./useControllableState-DG5wg-Pt.js";import"./Modal.context-CQeCPNOL.js";import"./Checkbox-CymVvhe2.js";import"./Fieldset-Tx5AMm_M.js";import"./Pencil-Dr6eZ4BA.js";import"./PersonbrukerTekst-DpP2kbNu.js";import"./ClockDashed-Dj0jo-Tm.js";import"./Tasklist-CM_CPJrS.js";import"./ErrorBoundary-C_S_6BLk.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Vt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Vt as default};
