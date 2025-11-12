import{aE as I,M as w,j as t,q as k,S as x,cx as j,cF as b,cE as g,cy as u,P as y,cU as _}from"./iframe-DbDViM4l.js";import{w as m,c as A}from"./ContextDecorators-DWtga1Rm.js";import{F as N,A as v}from"./FullførtStilling-Cyl_iWVe.js";import{R as T}from"./GjenåpneStillingKnapp-D8EpqKrh.js";import{T as E}from"./TilgangskontrollForInnhold-D-rekRG8.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-z3eI-lmk.js";import"./OrganisasjonsnummerAlert-B9U-ZlbE.js";import"./VStack-BZGT8t60.js";import"./BasePrimitive-BhL9LeIE.js";import"./List-BcY1tyt6.js";import"./Link-Hv6LWAB6.js";import"./KandidatHendelseTag-BGPKM9wu.js";import"./Tag-DmEV5QJe.js";import"./ChatExclamationmark-DeYUKd0q.js";import"./FileXMark-G5KnS3ki.js";import"./Trash-UsxNWQOA.js";import"./HandShakeHeart-Bf-w_Pgz.js";import"./Calendar-3ZbYViuM.js";import"./ThumbUp-DFSV4bnS.js";import"./Table-Bxe2bAWn.js";import"./util-BeoRUcqO.js";import"./parse-ZJjrIIlr.js";import"./getDefaultOptions-C864TKn6.js";import"./parseISO-CV4nDh-T.js";import"./index-CcWw8rVT.js";import"./index-B40KJ5b4.js";import"./isBefore-CIn-mkna.js";import"./util-71l1qqje.js";import"./accordion-V5noY9Cn.js";import"./index-D2wCJWZK.js";import"./index-DEFbf2WH.js";import"./index-Dw7BZEmm.js";import"./ChevronDown-eZR2a0Dl.js";import"./Box-BR7TAi0U.js";import"./Bell-BHKkC5gX.js";import"./PersonChat-OX8NlgFB.js";import"./Eye-BVrpRDH9.js";import"./ProgressBar-D7v7klab.js";import"./EyeSlash-rkhIny1O.js";import"./CircleSlash-ByT0510W.js";import"./Modal-BxFjZTmn.js";import"./floating-ui.react-CtXMieRy.js";import"./Date.Input-CSJDI19P.js";import"./useFormField-CncQnEt9.js";import"./useControllableState-Be-GcjUX.js";import"./Modal.context-CNG-GA15.js";import"./Checkbox-Du-agyww.js";import"./Fieldset-_4H8dfKO.js";import"./Pencil-ByyoBfwZ.js";import"./PersonbrukerTekst-CcxjMgul.js";import"./ClockDashed-et43V6IT.js";import"./Tasklist-CIcL4kCA.js";import"./ErrorBoundary-C6ErzpyW.js";function n({dropDown:r}){const{stillingsData:i,erEier:D}=I(),d=w(i,D),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
